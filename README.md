# calendra

<div align="center">
<img src="https://github.com/Jainex17/Calendra/assets/81921291/d510a9d5-ee60-442f-9983-6c8f982778e1" />
</div>

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
