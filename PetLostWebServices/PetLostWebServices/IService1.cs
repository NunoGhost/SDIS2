using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Xml.Serialization;
using MongoDB.Bson;
using MongoDB.Driver;

namespace PetLostWebServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IService1
    {

        /*[OperationContract]
        string GetData(int value);

        [OperationContract]
        CompositeType GetDataUsingDataContract(CompositeType composite);*/

        [OperationContract]
        [WebInvoke(UriTemplate = "Registo", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        Boolean Registo(RegistoForm form);

        [OperationContract]
        [WebInvoke(UriTemplate = "Login", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        Boolean Login(LoginForm form);

        [OperationContract]
        [WebInvoke(UriTemplate = "RegistoAnimal", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        Boolean RegistoAnimal(AniForm form);

        [OperationContract]
        [WebInvoke(UriTemplate = "BuscaLocal", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        List<AniForm> BuscaLocal(BuscaForm form);

        [OperationContract]
        [WebInvoke(UriTemplate = "Encontrado", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        Boolean Encontrado(string email);

        [OperationContract]
        [WebInvoke(UriTemplate = "ListaAnimais",RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        List<AniForm> ListaAnimais(string email);

        

        // TODO: Add your service operations here
    }


    // Use a data contract as illustrated in the sample below to add composite types to service operations.
    /*[DataContract]
    public class CompositeType
    {
        bool boolValue = true;
        string stringValue = "Hello ";

        [DataMember]
        public bool BoolValue
        {
            get { return boolValue; }
            set { boolValue = value; }
        }

        [DataMember]
        public string StringValue
        {
            get { return stringValue; }
            set { stringValue = value; }
        }
    }*/

    [DataContract]
    public class RegistoForm
    {
        string nomeValue;
        string contatoValue;
        string emailValue;
        string passwordValue;

        [DataMember]
        public string NomeValue
        {
            get { return nomeValue; }
            set { nomeValue = value; }
        }

        [DataMember]
        public string ContatoValue
        {
            get { return contatoValue; }
            set { contatoValue = value; }
        }

        [DataMember]
        public string EmailValue
        {
            get { return emailValue; }
            set { emailValue = value; }
        }

        [DataMember]
        public string PasswordValue
        {
            get { return passwordValue; }
            set { passwordValue = value; }
        }
    }

    [DataContract]
    public class LoginForm
    {
        string emailValue;
        string passwordValue;

        [DataMember]
        public string EmailValue
        {
            get { return emailValue; }
            set { emailValue = value; }
        }

        [DataMember]
        public string PasswordValue
        {
            get { return passwordValue; }
            set { passwordValue = value; }
        }
    }

    [DataContract]
    public class AniForm
    {
        string nomeValue;
        string racaValue;
        string emailValue;
        double localizacaoLatValue;
        double localizacaoLongValue;
        DateTime dataValue;
        byte[] fotoValue;
        Boolean encontradoValue;
        

        [DataMember]
        public string NomeValue
        {
            get { return nomeValue; }
            set { nomeValue = value; }
        }

        [DataMember]
        public string RacaValue
        {
            get { return racaValue; }
            set { racaValue = value; }
        }

        [DataMember]
        public string EmailValue
        {
            get { return emailValue; }
            set { emailValue = value; }
        }

        [DataMember]
        public double LocalizacaoLatValue
        {
            get { return localizacaoLatValue; }
            set { localizacaoLatValue = value; }
        }

        [DataMember]
        public double LocalizacaoLongValue
        {
            get { return localizacaoLongValue; }
            set { localizacaoLongValue = value; }
        }

        [DataMember]
        public DateTime DataValue
        {
            get { return dataValue; }
            set { dataValue = value; }
        }

        [DataMember]
        public byte[] FotoValue
        {
            get { return fotoValue; }
            set { fotoValue = value; }
        }

        [DataMember]
        public Boolean EncontradoValue
        {
            get { return encontradoValue; }
            set { encontradoValue = value; }
        }
    }

    [DataContract]
    public class BuscaForm
    {
        double localizacaoLatValue;
        double localizacaoLongValue;
        int raioValue;

        [DataMember]
        public double LocalizacaoLatValue
        {
            get { return localizacaoLatValue; }
            set { localizacaoLatValue = value; }
        }

        [DataMember]
        public double LocalizacaoLongValue
        {
            get { return localizacaoLongValue; }
            set { localizacaoLongValue = value; }
        }

        [DataMember]
        public int RaioValue
        {
            get { return raioValue; }
            set { raioValue = value; }
        }
    }
}
