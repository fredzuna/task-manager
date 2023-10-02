import { createRxDatabase, removeRxDatabase, addRxPlugin } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { subTaskSchema, taskSchema } from "./Schema";

addRxPlugin(RxDBDevModePlugin);

const InitializeDb = async () => {
  const dbStorage = getRxStorageDexie()

  removeRxDatabase('task_database', dbStorage);

  
  // create RxDB
  const db = await createRxDatabase({
    //name: 'task_database'
    name: 'task_database',                   // <- name
    storage: dbStorage,       // <- RxStorage
    ///password: 'myPassword',             // <- password (optional)
    // multiInstance: true,                // <- multiInstance (optional, default: true)
    //eventReduce: true,                  // <- eventReduce (optional, default: false)
    //cleanupPolicy: {}    
    // ignoreDuplicate: true
    ignoreDuplicate: true,
    multiInstance: true,                // <- multiInstance (optional, default: true)
    eventReduce: true,                  // <- eventReduce (optional, default: false)
    cleanupPolicy: {}                   // <- custom cleanup policy (optional) 
  });
  
  await db.addCollections({
    tasks: {
      schema: taskSchema
    },
    subtasks: {
      schema: subTaskSchema
    },
  });


  return db;
};

export default InitializeDb