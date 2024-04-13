import { Client } from "@opensearch-project/opensearch"


export const os_client = new Client({node: "http://52.203.223.240:9011"})