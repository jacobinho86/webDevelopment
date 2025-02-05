import MainNavigation from '../components/MainNavigation';
import { Outlet } from 'react-router-dom';
//import { useNavigation } from 'react-router-dom';

function RootPage() {
    //useNavigation is a hook to query the state of the http requests sent by the components
    //const navigation = useNavigation();

    return (
        <>
            <MainNavigation />
            <main>
                {/*navigation.state==='loading' && <p>Loading...</p>*/}
                <Outlet />
            </main>
        </>
    );
}

export default RootPage;