import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';


export const NavBar: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { user, isLoggedIn } = rootStore.userStore;
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities  
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities'/>
                <Menu.Item >
                    <Button 
                    as={NavLink} to='/createActivity'
                    positive content='Create Activity' />
                </Menu.Item>
                {user &&
                            <Menu.Item position='right'>
                              <Image avatar spaced='right' src={'/assets/user.png'} />
                              <Dropdown pointing='top left' text='user'>
                                <Dropdown.Menu>
                                  <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user'/>
                                  <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                                </Dropdown.Menu>
                              </Dropdown>
                            </Menu.Item>
                }
            </Container>
      </Menu>
    )
}

export default observer(NavBar);
