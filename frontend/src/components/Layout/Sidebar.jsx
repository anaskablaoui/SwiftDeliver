import './Sidebar.css'

function Sidebar({ role }) {
    let nav;

    switch (role) {
        case 'client':
            nav = (
                <nav>
                    <ul>
                        <li><a href="/client/dashboard">Dashboard</a></li>
                        <li><a href="/client/order-history">Commande</a></li>
                        <li><a href="/client/profile">Profile</a></li>
                    </ul>
                </nav>
            );
            break;

        case 'livreur':
            nav = (
                <nav>
                    <ul>
                        <li><a href="/livreur">Dashboard</a></li>
                        <li><a href="/livreur/deliveries">mes livraison</a></li>
                        <li><a href="#">profile</a></li>
                    </ul>
                </nav>
            );
            break;

        case 'admin':
            nav = (
                <nav>
                    <ul>
                        <li><a href="/admin/dashboard">Dashboard</a></li>
                        <li><a href="/admin/orders">Livraison</a></li>
                        <li><a href="/admin/livreurs">Livreur</a></li>
                        <li><a href="/admin/clients">Client</a></li>
                        <li><a href="/admin/settings">Settings</a></li>
                        <li><a href="#">Profile</a></li>
                    </ul>
                </nav>
            );
            break;

        default:
            nav = null;
    }

    return (
        <aside>
            <div className="blocks">bonjour Monsieur</div>
            <div className="blocks">{nav}</div>
            <div className="blocks"><button>deconnexion</button></div>
        </aside>
    );
}

export default Sidebar;