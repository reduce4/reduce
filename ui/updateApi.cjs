const fs = require('fs')
const path = require('path')
const http = require('http')
async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = "";
      res.on("data", _d => {
        data += _d;
      })
      res.on("end", () => {
        resolve(JSON.parse(data));
      })
    })
  })
}

function makeTemplate({
  json
}) {
  const templateHeader = `
  // @ts-ignore
  /* eslint-disable */
  import { request } from '@umijs/max';
`;
  const templateItem = ({
    httpMethod,
    apiName,
    apiPath,
  }) => {
    if (httpMethod == "GET") {
      return `
  export async function ${apiName}(body:any,options?: { [key: string]: any }) {
    return request<any>(${apiPath}, {
      method: "${httpMethod}",
      params: body,
      ...(options || {}),
    });
  `;
    } else {
      return `
  export async function ${apiName}(body: any, options?: { [key: string]: any }) {
    return request<any>("${apiPath}", {
      method: "${httpMethod}",
      data: body,
      ...(options || {}),
    });
  }
      `;
    }
  }
  const info = json.paths;
  const methods = [];
  for (const apiPath in info) {
    for (let httpMethod in info[apiPath]) {
      const apiName = info[apiPath][httpMethod].operationId;
      const methodTemplate = templateItem({
        httpMethod: httpMethod.toUpperCase(),
        apiName,
        apiPath: `/api${apiPath}`
      });
      methods.push(methodTemplate);
    }
  }
  const methodsTemplate = methods.join("\n");
  return `
  ${templateHeader}
  ${methodsTemplate}
  `;
}

function updateServiceFile({
  projectName,
  json
}) {
  const directoryPath = `./src/services/${projectName}`;
  const directoryExits = fs.existsSync(directoryPath)
  if (!directoryExits) {
    fs.mkdirSync(directoryPath)
  }
  const fileName = `index.ts`;
  const filePath = path.join(directoryPath, fileName)
  const fileTemplateContent = makeTemplate({
    json
  });
  fs.writeFileSync(filePath, fileTemplateContent, "utf-8");
}

async function init() {
  const json = await fetchJson("http://localhost:12000/v3/api-docs");
  updateServiceFile({
    projectName: "reduce",
    json
  });
}



init();
