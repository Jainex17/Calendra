import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { StoryFn } from '@storybook/react';

import Calendar from '../components/Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    dateValue: {
      control: {
        type: 'date',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dateValue: new Date(),
  },
  render: () => {
    const [dateValue, setDateValue] = useState(new Date());
    
    return (
      <Calendar dateValue={dateValue} setDateValue={setDateValue} />
    );
    
    
  },
};
