import { type GlobalEstudianteResponse } from './interfaces/global-estudiantes-response';

const DB_NAME = 'db-estudiantes';
const STORE_NAME = 'sn-estudiantes';
const DB_VERSION = 1;

let db: IDBDatabase;

export const openDbEstudiantes = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        };

        request.onsuccess = (event) => {
            db = (event.target as IDBOpenDBRequest).result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject(new Error(`Error opening IndexedDB Estudiantes:::: ${event}`));
        };

    });

};

export const addEstudiante = async (person: GlobalEstudianteResponse) => {
    const db = await openDbEstudiantes();
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);


        person.id = person.IDENTIFICACION

        const request = store.put(person);
    
        request.onsuccess = () => {
            resolve();
        };
    
        request.onerror = () => {
            reject(new Error('Error adding person'));
        };
    
        transaction.oncomplete = () => {
            // console.log('Transaction completed successfully');
        };
    
        transaction.onerror = () => {
            reject(new Error('Transaction error'));
        };
        });
    };


export const getAllEstudiantes = async () => {
    const db = await openDbEstudiantes();
    return new Promise<any[]>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(new Error('Error getting all people'));
        };
    });
};

export const searchEstudiante = async (query: string) => {
    const db = await openDbEstudiantes();
    return new Promise<any[]>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            const people = request.result;
            const filtered = people.filter((person: any) =>
                Object.values(person).some((value: any) =>
                    value.toString().toLowerCase().includes(query.toLowerCase())
                )
            );
            resolve(filtered);
        };

        request.onerror = () => {
            reject(new Error('Error searching people'));
        };
    });
};
