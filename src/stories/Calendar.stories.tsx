import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Calendar from '../components/Calendar';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    
    const [dateValue, setDateValue] = useState(new Date());
    
    return <Calendar dateValue={dateValue} setDateValue={setDateValue} />;
    
    
  },
};
