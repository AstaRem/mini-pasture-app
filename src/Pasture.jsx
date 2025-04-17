import { useState, useEffect } from "react";
import './pasture.css';


const STORAGE_KEY = 'pasture-animals';

const loadFromStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const saveToStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


export default function Pasture() {

    const [animals, setAnimals] = useState([]);
    const [type, setType] = useState('avis');
    const [weight, setWeight] = useState('');
    const [editId, setEditId] = useState(null);

    //load animals from local storage on page load

    useEffect(() => {
        setAnimals(loadFromStorage())
    }, [])

    //save to local storage whenever animals change
    useEffect(() => {
        saveToStorage(animals);
    }, [animals]);

    const handleAdd = () => {
        if (!weight || isNaN(weight)) return;
        const newAnimal = {
            id: Date.now(),
            type,
            weight: parseFloat(weight)
        };
        setAnimals([...animals, newAnimal]);
        setWeight('');
    }

    const handleDelete = (id) => {
        setAnimals(animals.filter((a) => a.id !== id));
    };

    const startEdit = (animal) => {
        setEditId(animal.id);
        setWeight(animal.weight);
        setType(animal.type);
    }

    const handleUpdate = () => {
        setAnimals(
            animals.map((a) => a.id === editId ? { ...a, weight: parseFloat(weight) } : a)
        )

        setEditId(null);
        setWeight('');
    };

    return (
        <div>
            <h2>Ganykla</h2>
            <div className="wrapper">

                <div className="input-container">
                    <div className="">
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="avis">Avis</option>
                            <option value="antis">Antis</option>
                            <option value="antilopė">Antilopė</option>
                        </select>
                    </div>

                    <div className="">
                        <input
                            type="number"
                            placeholder="Svoris, kg"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}

                        ></input>
                    </div>


                    <div className="">

                        <button className="add-update-btn" onClick={editId ? handleUpdate : handleAdd}>
                            {editId ? 'Atnaujinti' : 'Pridėti'}
                        </button>
                    </div>


                </div>

                <ul>
                    {animals.map(animal => (
                        <li key={animal.id} className={editId === animal.id ? "editing" : ""}>{animal.type} -  {animal.weight} kg
                        <div className="buttons">
                            <button className="edit-btn" onClick={() => startEdit(animal)}>✏️</button>
                            <button className="delete-btn" onClick={() => handleDelete(animal.id)}>❌</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>


    )

}