import { GraphqlDataSource } from "./datasource";

const apiUrl = "https://rickandmortyapi.com/graphql";
const headers = {};

const apiPrueba = new GraphqlDataSource(apiUrl, headers);

console.log("Lista de caracteres por ID.")
const ids = [1, 2, 3].toString();
console.log(ids)
const charactersByIds = `
    charactersByIds(ids:[${ids}]){
        id
        name
        status
        species
    }
`

apiPrueba
.queryDataLoader.load(charactersByIds)
.then(x => console.log("Prueba: ", x))

console.log("Lista de caracteres")
const queryChar = `
    characters(filter: { name: "rick" }) {
        results {
            name
            status
            species
        }
    }
`
apiPrueba
.queryDataLoader.load(queryChar)
.then(x => console.log("characters: ", x))


// Pokemon API
const routerPoke = "https://beta.pokeapi.co/graphql/v1beta"
const routerHead = {}
const pokemon = new GraphqlDataSource(routerPoke, routerHead);
const where = `"sturdy"`
const orderBy = "asc"
const pokemon_v2_ability = `
    pokemon_v2_ability(
        where: {name: { _eq: ${where} }}, 
        order_by: [{generation_id: ${orderBy}}]
    ) {
        name
    }
`
pokemon
.queryDataLoader.load(pokemon_v2_ability)
.then(x => console.log("Pokemon: ", x))

console.log("Nueva instancia de Cliente GraphQL");
const routerApi = "url_de_router_fi"
const routerHeads = {"AUTHORIZATION": "="}
const routerPrueba = new GraphqlDataSource(routerApi, routerHeads);

const id = ""
const valor = ""

const queryComprobante = `
    comprobante(comprobante: { criterio: ${id}, valor: "${valor}"}) {
        id
        fechaHoraInsercion
        fechaHoraActualizacion
        fechaHora
        codigoVerificador
    }
`

routerPrueba
.queryDataLoader.load(queryComprobante)
.then(x => console.log("Comprobante: ", x))