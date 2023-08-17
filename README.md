# calendra

<div align="center">
<img src="https://github.com/Jainex17/Calendra/assets/81921291/ac95064f-3e69-4e59-8d3a-c68f6e265790" />
</div>

## Props

| Name         | Type                                            | Default  | Description                                                                   |
|--------------|-------------------------------------------------|----------|-------------------------------------------------------------------------------|
| dateValue  | Date                                          | Required | The selected date value.                                                      |
| setDateValue | (value: React.SetStateAction<Date>) => void  | Required | A function to set the new date value.                                        |
| darkMode   | boolean                                       | `false`  | Optional. Set to `true` to enable dark mode.                                 |
| readOnly   | boolean                                       | `false`  | Optional. Set to `true` to disable user interactions with the calendar.       |
| yearRange  | [number, number]                             | last 50 year | Optional. The allowed range of years for the calendar.                     |


### Usage

Here's an example of basic usage:

```tsx
import React, { useState } from 'react';
import { Calendar } from 'calendra';

function App() {
  const [dateValue, setDateValue] = useState(new Date());

  return (
    <>
      <Calendar dateValue={dateValue} setDateValue={setDateValue} />
    </>
  );
}
```
