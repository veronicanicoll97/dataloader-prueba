import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-tag';
import DataLoader from 'dataloader';

export default class GraphqlDataSource {
    client: any;
    queryDataLoader: DataLoader<any, any>;
    mutationDataLoader: DataLoader<any, any>;
    /**
     * Sirve para obtener la informacion de la fuente de datos,
     * en este caso el servidor GraphQL.
     */
    constructor(uri: string, headers: Record<string, string>) {
        this.client = new GraphQLClient(uri, { headers });
        this.queryDataLoader = new DataLoader(
            this.queryDataLoaderMethod.bind(this)
        );
        this.mutationDataLoader = new DataLoader(
            this.queryDataLoaderMethod.bind(this)
        );
    }

    async queryDataLoaderMethod(queries): Promise<any[]> {
        console.log('Cantidad de queries: ' + queries.length);
        const document = GraphqlDataSource.createDocument(queries);
        console.log(
            'Documento generado: ' + JSON.stringify(document.loc?.source.body)
        );

        console.log('Envia petición al servidor GraphQL');
        const response = await this.client.request(document, {});
        console.log('Recibe respuesta del servidor GraphQL');
        console.log('Respuesta: ' + JSON.stringify(response));

        return Object.values(response);
    }

    async mutationDataLoaderMethod(mutations) {
        console.log('Cantidad de mutaciones: ' + mutations.length);
        const document = GraphqlDataSource.createDocument(
            mutations,
            'mutation'
        );
        console.log(
            'Documento generado: ' + JSON.stringify(document.loc?.source.body)
        );

        console.log('Envia petición al servidor GraphQL');
        const response = await this.client.request(document);
        console.log('Recibe respuesta del servidor GraphQL');
        console.log('Respuesta: ' + JSON.stringify(response));

        return Object.values(response);
    }

    static createDocument(queries, operation = 'query') {
        return gql`
            ${operation} {
                ${queries.map((query, index) => `q${index}: ${query}`).join('')}
            }
        `;
    }
}
