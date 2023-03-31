import { useState, useEffect } from "react";
import itemService from "../../services/itemService";

const Home = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        itemService.getAll()
            .then((res) => {
                console.log(res);
                setItems(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <section className="content-wrapper">
            <h1>Home</h1>

            <article className="items">
                {items.map(item => 
                    <section className="item">
                        <p>{item.title}</p>
                    </section>
                )}
            </article>
        </section>
    )
};

export default Home;