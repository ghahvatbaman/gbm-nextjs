import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

function ApiDoc() {
  return <SwaggerUI url={"/openapi.json"} />;
}

export default ApiDoc;
