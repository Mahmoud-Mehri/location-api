import { Location } from "./location";
import { User } from "./user";

export async function syncTables() {
  await User.sync({ force: true });
  await Location.sync({ force: true });

  await User.create({ email: "mahmoud.mehri90@gmail.com", password: "123456" });
}
