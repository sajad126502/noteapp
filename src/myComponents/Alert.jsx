// @flow
import React from 'react';

export function Alert(props) {
  return (
    <>
    <div className={"alert alert-"+props.col} role="alert">
  {props.message}
</div>
</>
  );
};