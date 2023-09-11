import  { openDB} from ' idb'

let db;

async function createDB() {

    try {
        db = await openDB('banco', 1,{
            upgrade(db, oldVersion, newVersion, Transaction){
                switch (oldVersion) {
                    case 0:
                    case 1:

                    const store = db.createObjectStore('pessoas', {
                        //A propiedade nome será o campo chave
                        key: 'nome'
                    })
                    //Criando um indice id na store, deve star contido no objeto do bancod
                      store.createIndex('id', 'id');
                      showResult('Banco de dados foi criado!')

                }
            }
        })
        showResult('Banco de dados foi aberto!')
        
    } catch (e) {
        showResult('erro ao criar o banco de dados'+ e.mensage)
        
    }   
}