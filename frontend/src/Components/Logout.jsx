import { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { UserContext, LogoutContext,CustomerIdTransfer,ConsultantIdTransfer,CattleIdContext } from './App';


const Logout = () => {

    const { dispatch } = useContext(UserContext);
    const { logoutdispatch } = useContext(LogoutContext);

    const { CustomerIDdispatch } = useContext(CustomerIdTransfer);
    const { ConsultantIddispatch } = useContext(ConsultantIdTransfer);
    const { CattleIddispatch } = useContext(CattleIdContext);
    const history = useHistory();

    // console.log('im in logout page');
    dispatch({ type: 'logout', payload: 'false' });
    logoutdispatch({ logout: 'true' });
    localStorage.removeItem('lstate');
    localStorage.removeItem('tstate');

    // CustomerIDdispatch({
    //     payload: '',
    // })
    // ConsultantIddispatch({
    //     payload: '',
    // })
    // CattleIddispatch({
    //     type: '',
    // })

    window.alert('Logout Successfully');
    history.push('/home');


    return (
        <>
            <h1>logout page</h1>
        </>
    )

}

export default Logout;


