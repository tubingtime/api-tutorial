import React, {Fragment, useState} from "react";

const InputTodo = () => {
    const [description, setDescription] = useState("");
    const [listId, setListId] = useState("");

    const onSubmitForm = async (formEvent: React.FormEvent) => {
        formEvent.preventDefault();
        try {
            const body = { description } // we use brackets around a string to make it an object/json
            console.log(body);
            const response = await fetch(`http://localhost:5000/lists/${listId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
            <h2 className="text-center"> Input New Todo Item</h2>
            <form className="flex mt-5 justify-center" onSubmit={onSubmitForm}>
                <div className="self-center">
                    <label>
                        List ID
                    </label>
                    <input
                        type="text"
                        className="border rounded mx-5"
                        value={listId}
                        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setListId(e.target.value)}
                    />
                </div>
                
                <div className="self-center">
                    <label>
                        Description
                    </label>
                    <input
                        type="text"
                        className="border rounded mx-5"
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <button className="bg-blue-400 hover:bg-blue-800 text-white font-bold rounded">Add</button>
                </div>
            </form>
        </Fragment>
    );
};


export default InputTodo;