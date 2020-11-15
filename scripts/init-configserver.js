rs.initiate(
   {
      _id: "mongors1conf",
      configsvr: true,
      version: 1,
      members: [
         { _id: 0, host : "mongocfg1" }
      ]
   }
)