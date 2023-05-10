import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { loadItems, Item } from 'store/reducers/itemsSlice';
import { Container, Col, Row, Image, Button, InputGroup, Form, Modal } from 'react-bootstrap';
import { addCart, cartReset, cartDeleteItem, cartUpdateQuantity, cartCheckout } from 'store/reducers/cartSlice';
import ButtonQty from 'components/ButtonQty';
import { UCFirstWord, currency } from 'helper/Utils';

const Home = () => {
  const dispatch: any = useAppDispatch();
  const { items, categories }: { items: Item[], categories: Item[] } = useAppSelector((state: any) => state.items);
  const cart = useAppSelector((state: any) => state.cart);

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [sort, setSort] = useState('DESC');

  const handleCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const filterItems = () => {
    let newItems: Item[] = [];

    newItems = (category === 'all') ? [...items] : items.filter((i: Item) => i.category === category);

    if (keyword) {
      newItems = newItems.filter((i: Item) => {
        return (i.productName.toLocaleLowerCase()).search(keyword) !== -1;
      });
    }


    newItems.sort((a: Item, b: Item) => {
      if (sort === 'DESC')
        return a.unitPrice > b.unitPrice ? -1 : 1;
      else
        return a.unitPrice < b.unitPrice ? -1 : 1
    })

    setFilteredItems(newItems);
  };

  const handleAddCart = (item: Item) => {
    dispatch(addCart(item));
  };

  const handleClearCart = () => {
    dispatch(cartReset())
  };

  const handleCheckout = () => {
    dispatch(cartCheckout({})).then(() => {
      setShowCheckout(false);
      setShowMessage(true);
    });
  };

  const handleSort = () => {
    setSort(prev => prev === 'ASC' ? 'DESC' : 'ASC');
  }

  const renderItems = () => {
    return filteredItems.map((item: Item) => {
      return (
        <div key={`item-${item.id}`} className="ItemContainer">
          <Row>
            <Col xs={3}>
              <Image src={item.imageUrl} width={80} thumbnail />
            </Col>
            <Col>
              <div>{item.productName}</div>
              <div className="category">{UCFirstWord(item.category)}</div>
              {currency(item.unitPrice)}
            </Col>
            <Col xs={3}>
              <Button size="sm" onClick={() => handleAddCart(item)}>Add cart</Button>
            </Col>
          </Row>
          <div className="description">{item.description}</div>
        </div>
      );
    });
  };

  const renderCartSummary = () => {
    if (cart.items.length === 0) {
      return (
        <div>Empty cart</div>
      );
    }

    return (
      <div className="summaryContainer">
        <Row>
          <Col>Total Items:</Col>
          <Col className="text-right">{cart.totalItems}</Col>
        </Row>
        <Row>
          <Col>Total Amount:</Col>
          <Col className="text-right">{currency(cart.totalAmount)}</Col>
        </Row>

        <div className="text-right">
          <Button onClick={() => {
            if (cart.items.length > 0) {
              setShowCheckout(true);
            }
          }}>Checkout</Button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(loadItems({})).then((action: any) => {
      setFilteredItems(action.payload.items);
    });
  }, []);

  useEffect(() => {
    filterItems();
  }, [category, keyword, sort]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} className="sidebar">
            <div onClick={() => handleCategory('all')} className={`menu ${category === 'all' ? 'active-menu' : ''}`}>All</div>

            {categories.map((cat: Item) => {
              return <div key={`category-${cat.id}`} className={`menu ${category === cat.category ? 'active-menu' : ''}`} onClick={() => handleCategory(cat.category)}>{UCFirstWord(cat.category)}</div>
            })}
          </Col>
          <Col xs={6}>
            <Form.Control
              placeholder="Search Item"
              onChange={(event) => {
                setKeyword(event.target.value.toLocaleLowerCase());
              }}
            />

            <div className="text-right">
              <span className='cursor-pointer' onClick={handleSort}>
                {sort === 'ASC' ? 'Sort price high to low' : 'Sort price low to high'}
              </span>
            </div>

            {renderItems()}
          </Col>
          <Col xs={4} className="sidebar">
            <Row>
              <Col>My Cart</Col>
              <Col className="text-right">
                <Button size="sm" onClick={handleClearCart}>Clear Cart</Button>
              </Col>
            </Row>
            {cart.items.map((item: Item) => {
              return (
                <div key={`cart-item-${item.id}`}>
                  <Row className="ItemContainer">
                    <Col xs={2}>
                      <div><Image src={item.imageUrl} width={60} thumbnail /></div>
                      <div className="text-danger cursor-pointer" onClick={() => {
                        dispatch(cartDeleteItem(item))
                      }}>Delete</div>

                    </Col>
                    <Col>
                      <div>{item.productName}</div>
                      <div className="text-12">{currency(item.unitPrice * item.quantity)}</div>
                    </Col>
                    <Col xs={4}>
                      {<ButtonQty value={item.quantity} onChange={(value) => {
                        dispatch(cartUpdateQuantity({
                          id: item.id,
                          quantity: value
                        }))
                      }} />}
                    </Col>
                  </Row>
                </div>
              )
            })}

            {renderCartSummary()}
          </Col>
        </Row>
      </Container >

      <Modal show={showCheckout} onHide={() => { setShowCheckout(false) }}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>Total Items</Col>
            <Col className="text-right">{cart.totalItems}</Col>
          </Row>
          <Row>
            <Col>Total Amount</Col>
            <Col className="text-right">{currency(cart.totalAmount)}</Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCheckout(false)} >Close</Button>
          <Button variant="primary" onClick={handleCheckout}>Proceed</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMessage} onHide={() => { setShowMessage(false) }}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Thank you for purchasing</div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowMessage(false)} >Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Home