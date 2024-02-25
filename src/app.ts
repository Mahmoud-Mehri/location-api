import config from "./config";
import { syncTables } from "./model/sync-tables";
import { httpApp } from "./interfaces/http";

syncTables();

httpApp.listen(config.http.port, () => {
  console.log(`App is listening on port ${config.http.port}`);
});
