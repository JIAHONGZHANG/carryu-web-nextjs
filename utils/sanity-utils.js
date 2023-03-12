import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

const builder = imageUrlBuilder(sanityConfig);

export const urlFor = (source) => builder.image(source);

export const client = createClient(sanityConfig);
