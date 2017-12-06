import {Mongoose} from "../../mongodb-connection";
import {BasicExpModel} from "../BasicExpSchema";

export const AppleMarketSchema = new Mongoose.Schema({
  Types: [
    {
      test: String
    }
  ]
});
export const AppleMarketModel = BasicExpModel.discriminator('AppleMarket', AppleMarketSchema);


