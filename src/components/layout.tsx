import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'store';
import Link from 'next/link';
import Head from 'next/head';
import { Container, Navbar, Nav, NavDropdown, Toast } from 'react-bootstrap';
import { hideMessage } from 'store/reducers/messageSlice';

function Layout({ children }) {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state: any) => state);

  useEffect(() => {

  }, [message]);

  return (
    <>
      <Head>
        <title>Online Shopping Store</title>
      </Head>
      <main>
        <Container>
          <Navbar bg="light" expand="lg">
            <div>Online Shopping Store</div>
          </Navbar>

          <Toast onClose={() => dispatch(hideMessage({}))} show={message.show} delay={message.options.autoHideDuration} autohide style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1000
          }}
          >
            <Toast.Header>
              <strong className="me-auto">{message.options.title}</strong>
            </Toast.Header>
            <Toast.Body>{message.options.message}</Toast.Body>
          </Toast>


          {children}
        </Container>
      </main>
    </>
  )
}

export default Layout
