import React, { useState } from 'react';
import { DivCalendar, DivTextCloseModel, ErrorContainer, TextCloseModel } from './calendarModelStyle';
import { TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import IconFeather from 'react-native-vector-icons/Feather';

export const CalendarScreen = ({onClose, onSelectedDate}: {onClose: () => void, onSelectedDate: (date: string) => void}) => {
    const [date, setDate] = useState(dayjs());
    return (
    <ErrorContainer>
        <DivCalendar>
            <DivTextCloseModel><TouchableWithoutFeedback onPress={onClose}><IconFeather name='x' size={24} color={'#000'} /></TouchableWithoutFeedback></DivTextCloseModel>
            <DateTimePicker
            mode='single'
            date={date}
            onChange={(e) => {
                const selectedDate = e.date ? dayjs(e.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
                setDate(e.date ? dayjs(e.date) : dayjs())
                onSelectedDate(selectedDate);
                {onClose}
            }}
            selectedItemColor='#6B7AE5'
            />
            
        </DivCalendar>

    </ErrorContainer>
    );
}
  