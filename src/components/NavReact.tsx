import { type Item } from '../components/Nav.astro';
import FreighterConnectButton from './FreighterConnectButton';
import './nav.css';

const ReactNav = ({ list }: { list: Item[] }) => {
    return (
        <nav>
            <a href="/prettytendr"><img className="logo w-[75px]" src='/prettytendr/public/images/logo.svg' alt="PrettyTendr logo" /></a>
            <ul>
                {list.map((item) => (
                    <li key={item.link}>
                        <a className="menu-item" href={item.link}>{item.name}</a>
                    </li>
                ))}
                <li><FreighterConnectButton  /></li>
            </ul>
        </nav>
    );
}

export default ReactNav;