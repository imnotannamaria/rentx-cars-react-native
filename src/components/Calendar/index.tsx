import React from 'react';

import { Feather } from '@expo/vector-icons';

import { 
  Calendar as CustomCalendar,
  DateData,
  LocaleConfig
} from 'react-native-calendars';

import { useTheme } from 'styled-components';

import { ptBR } from './localeConfig';
import { generateInterval } from './generateInterval';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  }
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (day: DateData) => void;
}

function Calendar({ markedDates, onDayPress } : CalendarProps) {
  const theme = useTheme();

  const date = new Date().toString();

  return (
    <CustomCalendar
      renderArrow={(direction) => 
        <Feather 
          size={24} 
          color={theme.colors.text} 
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
      />}

      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}

      theme={{
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}

      firstDay={1}
    
      minDate={date}

      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    /> 
  )
}

export {
  Calendar,
  MarkedDateProps,
  generateInterval,
}