import React, {Fragment, useState} from "react";

const CreateTodoList = () => {
    const [listName, setListName] = useState("");

    const onSubmitForm = async (formEvent: React.FormEvent) => {
        formEvent.preventDefault();
        try {
            console.log("Creating new todo list...");
            const body = { name: listName };
            const response = await fetch(`http://localhost:5000/lists`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log("response:");
            console.log(response);
            location.reload();
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <Fragment>
            <h2 className="text-center"> Add a new TodoList</h2>
            <form className="flex mt-5 justify-center" onSubmit={onSubmitForm}>
                <div className="self-center">
                    <label>
                        List Name
                    </label>
                    <input
                        type="text"
                        className="border rounded mx-5"
                        value={listName}
                        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setListName(e.target.value)}
                    />
                </div>
                <div>
                    <button className="bg-blue-400 hover:bg-blue-800 text-white font-bold rounded">Add</button>
                </div>
            </form>
        </Fragment>
    );
};


export default CreateTodoList;