import  { openDB} from 'idb'

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
                        keyPath: 'nome'
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

window.addEventListener("DOMContentLoaded", async event =>{
    createDB()
    document.getElementById("input")
    document.getElementById("btnSalvar").addEventListener("click", addData);
    document.getElementById("btnListar").addEventListener("click", getData)
})

async function addData(){
    const tx = await db .transaction('pessoas', 'readwrite');
    const store = tx.objectStore('pessoas');
    store.add({nome:'Lucas'});
    await tx.done;

}

function showResult(text) {
    document.querySelector('output').innerHTML = text;
    
}

async function getData(){
    const tx = await db.transaction('pessoas','readonly');
    const store = tx.objectStore('pessoas');
    const value = await store.getAll();
   
    if (value) {
        showResult('dados do banco:' + JSON.stringify(value))

        
    } else {
        showResult('não há nenhum dado no banco')
    }

    
}