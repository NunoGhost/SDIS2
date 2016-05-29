using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using MongoDB.Bson;
using MongoDB.Driver;

namespace PetLostWebServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        /*public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }*/

        protected static IMongoClient _client;
        protected static IMongoDatabase _database;
        private string connBD = "mongodb://192.168.1.168:27017";
        public Boolean Registo(RegistoForm form)
        {
            _client = new MongoClient(connBD);
            _database = _client.GetDatabase("test");

            var document = new BsonDocument
            {
                {"name", form.NomeValue},
                {"contact", form.ContatoValue},
                {"email", form.EmailValue},
                {"password", form.PasswordValue}
            };

            var collection = _database.GetCollection<BsonDocument>("User");
            try
            {
                collection.InsertOne(document);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return false;
        }

        public Boolean Login(LoginForm form)
        {
            _client = new MongoClient(connBD);
            _database = _client.GetDatabase("test");

            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Eq("email", form.EmailValue) & builder.Eq("password", form.PasswordValue);


            var collection = _database.GetCollection<BsonDocument>("User");

            try
            {
                var result = collection.Find(filter).ToList();
                if (result.Count() == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return false;
        }

        public Boolean RegistoAnimal(AniForm form)
        {
            _client = new MongoClient(connBD);
            _database = _client.GetDatabase("test");

            var document = new BsonDocument
            {
                {"name", form.NomeValue},
                {"raca", form.RacaValue},
                {"email", form.EmailValue},
                {"localizacaoLat", form.LocalizacaoLatValue},
                {"localizacaoLong", form.LocalizacaoLongValue},
                {"data", form.DataValue.ToString()},
                {"foto",form.FotoValue},
                {"encontrado", form.EncontradoValue}
            };

            var collection = _database.GetCollection<BsonDocument>("Registo");
            try
            {
                collection.InsertOne(document);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return false;
        }

        public List<AniForm> BuscaLocal(BuscaForm form)
        {
            _client = new MongoClient(connBD);
            _database = _client.GetDatabase("test");

            double maxPossibleLat = form.LocalizacaoLatValue + (form.RaioValue * 0.0045 * 2);
            double minPossibleLat = form.LocalizacaoLatValue - (form.RaioValue * 0.0045 * 2);
            double maxPossibleLong = form.LocalizacaoLongValue + (form.RaioValue * 0.0045 * 2);
            double minPossibleLong = form.LocalizacaoLongValue - (form.RaioValue * 0.0045 * 2);

            var collection = _database.GetCollection<BsonDocument>("Registo");
            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Gt("localizacaoLat", minPossibleLat) & builder.Lt("localizacaoLat", maxPossibleLat) & builder.Gt("localizacaoLong", minPossibleLong) & builder.Lt("localizacaoLong", maxPossibleLong);

            List<AniForm> formArray = new List<AniForm>();

            try
            {

                var result = collection.Find(filter).ToList();
                foreach (var document in result)
                {

                    var R = 6371;
                    var lat1 = (Math.PI / 180) * document["localizacaoLat"].AsDouble;
                    var lat2 = (Math.PI / 180) * form.LocalizacaoLatValue;
                    var latF = (Math.PI / 180) * (document["localizacaoLat"].AsDouble - form.LocalizacaoLatValue);
                    var longi = (Math.PI / 180) * (document["localizacaoLong"].AsDouble - form.LocalizacaoLongValue);

                    var a = Math.Sin(latF / 2) * Math.Sin(latF / 2) + Math.Cos(lat1) * Math.Cos(lat2) * Math.Sin(longi / 2) * Math.Sin(longi / 2);
                    var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
                    var d = R * c;


                    if (d <= form.RaioValue)
                    {
                        AniForm formInterno = new AniForm();

                        formInterno.NomeValue = document["name"].AsString;
                        formInterno.RacaValue = document["raca"].AsString;
                        formInterno.EmailValue = document["email"].AsString;
                        formInterno.LocalizacaoLatValue = document["localizacaoLat"].AsDouble;
                        formInterno.LocalizacaoLongValue = document["localizacaoLong"].AsDouble;
                        formInterno.DataValue = document["data"].AsString;
                        formInterno.FotoValue = document["foto"].AsByteArray;
                        formInterno.EncontradoValue = document["encontrado"].AsBoolean;

                        formArray.Add(formInterno);
                    }

                }
                return formArray;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return formArray;
        }

        public Boolean Encontrado(string email, string nomeAnimal)
        {
            _client = new MongoClient(connBD);
            _database = _client.GetDatabase("test");

            var collection = _database.GetCollection<BsonDocument>("Registo");
            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Eq("email", email) & builder.Eq("name", nomeAnimal);

            var update = Builders<BsonDocument>.Update
                .Set("encontrado", true)
                .CurrentDate("lastModified");

            try
            {
                collection.UpdateOne(filter,update);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return false;
        }

        public List<AniForm> ListaAnimais(string email)
        {
            _client = new MongoClient(connBD);
            _database = _client.GetDatabase("test");

            var collection = _database.GetCollection<BsonDocument>("Registo");
            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Eq("email", email);
            List<AniForm> formArray = new List<AniForm>();
                       
            try
            {
                
                var result = collection.Find(filter).ToList();
                foreach (var document in result)
                {


                    AniForm form = new AniForm();

                    form.NomeValue = document["name"].AsString;
                    form.RacaValue = document["raca"].AsString;
                    form.EmailValue = email;
                    form.LocalizacaoLatValue = document["localizacaoLat"].AsDouble;
                    form.LocalizacaoLongValue = document["localizacaoLong"].AsDouble;
                    form.DataValue = document["data"].AsString;
                    form.FotoValue = document["foto"].AsByteArray;
                    form.EncontradoValue = document["encontrado"].AsBoolean;
                    
                    formArray.Add(form);

                }
                return formArray;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return formArray;
        }


        public RegistoForm PersonalInfo(string email)
        {
            _client = new MongoClient(connBD);
            _database = _client.GetDatabase("test");

            var collection = _database.GetCollection<BsonDocument>("User");
            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Eq("email", email);


            try
            {
                var result = collection.Find(filter).ToList();
                if (result.Count() == 1)
                {
                    var document = result.First();
                    RegistoForm form = new RegistoForm();
                    form.NomeValue = document["name"].AsString;
                    form.ContatoValue = document["contact"].AsString;
                    form.EmailValue = email;
                    form.PasswordValue = "";
                    return form;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return null;
        }

    }
}
