import Image from 'next/image';
import { Button, Container, Menu } from 'semantic-ui-react';

function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <Image
            src="/logo.png"
            alt="logo"
            width={45}
            height={45}
            style={{ marginRight: 10 }}></Image>
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities"></Menu.Item>
        <Menu.Item>
          <Button positive content="Create activity"></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default NavBar;
