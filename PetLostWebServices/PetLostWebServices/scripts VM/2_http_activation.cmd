DISM /online /Enable-Feature /FeatureName:NetFx3 /FeatureName:WCF-HTTP-Activation /FeatureName:IIS-ASPNET
DISM /online /Enable-Feature /FeatureName:NetFx3 /FeatureName:WCF-HTTP-Activation /FeatureName:WCF-NonHTTP-Activation
DISM /Online /Enable-Feature /all /FeatureName:WCF-HTTP-Activation45