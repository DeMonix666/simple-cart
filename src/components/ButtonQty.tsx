import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface ButtonQtyProps {
  value: number;
  onChange: (val: number) => void;
}

const ButtonQty = ({
  value = 1,
  onChange = () => null,
}: ButtonQtyProps) => {
  const [qty, setQty] = useState<number>(value);

  const updateQty = (val: number) => {
    const newQty = qty + val;
    setQty(newQty <= 0 ? 1 : newQty);
  };

  useEffect(() => {
    onChange(qty);
  }, [qty]);

  return (
    <div className="buttonQtyContainer">
      <InputGroup className="mb-3">
        <Button
          size="sm"
          onClick={() => updateQty(-1)}
        >
          -
        </Button>

        <Form.Control
          style={{ textAlign: 'center' }}
          type="text"
          value={value}
          onChange={(e) => {
            const newQty = Number(e.target.value);
            setQty(() => {
              return newQty <= 0 ? 1 : newQty;
            });
            }}
        />
        <Button size="sm" onClick={() => updateQty(1)}>
          {'+'}
        </Button>
      </InputGroup>
    </div>
  )
}

export default ButtonQty;
