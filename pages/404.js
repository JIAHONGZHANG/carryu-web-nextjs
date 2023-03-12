import Error from "next/error";
import SEO from "../comps/SEO";

export default function Page() {
  return (
    <>
      <SEO title={`404`} />
      <Error statusCode={404} />
    </>
  );
}
