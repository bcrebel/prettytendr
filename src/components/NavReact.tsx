import { type Item } from '../components/Nav.astro';

const ReactNav = ({ list }: { list: Item[] }) => {
    return (
        <nav>
            <ul>
                {list.map((item) => (
                    <li key={item.link}>
                        <a href={item.link}>{item.name}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default ReactNav;