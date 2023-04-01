import Header from '../Header/Header';

const Layout = (props) => {
    return (
        <div className="page-wrapper">
            <Header></Header>
            <main>{props.children}</main>
        </div>
    )
};

export default Layout;