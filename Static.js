import "intl";
import "intl/locale-data/jsonp/en";

export const apiKey = "API_SECRET-42e016b219421dc83d180bdee27f81dd";
export const server = "http://192.168.254.104:5002";
export const adminserver = "http://192.168.254.104";
export const currancyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});
