import css from 'styled-jsx/css';

export const DatepickerStyles = css.global`
  & .react-datepicker-popper {
    z-index: 1060;

    &[data-placement^='bottom'] {
      padding-top: 0;
    }
    & .react-datepicker {
      font-size: 24px;
      width: 360px !important;
      heigth: auto;
      border-radius: 5px;
      overflow: hidden;
      border: none;
      box-shadow:
        0 6px 16px 0 rgb(0 0 0 / 8%),
        0 3px 6px -4px rgb(0 0 0 / 12%),
        0 9px 28px 8px rgb(0 0 0 / 5%);

      & .react-datepicker__triangle {
        display: none;
      }

      & .react-datepicker__month-container {
        width: 100%;
      }

      & .react-datepicker__navigation-icon {
        top: 4px;

        &::before {
          border-color: #f2f6fe;
        }
      }
      & .react-datepicker__navigation--previous {
        left: 12px;
      }
      & .react-datepicker__navigation--next {
        right: 12px;
      }

      & .react-datepicker__header {
        background-color: #ced8d5;
        padding: 10px;
        border-bottom: 1px solid #f2f6fe;
      }

      & .react-datepicker__header__dropdown--select {
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;

        & > div > select {
          margin: 10px 0;
          width: 50px;
          text-align: center;

          font-size: 16px;
          font-weight: 500;
          line-height: 1.67;
          letter-spacing: -0.3px;
        }
      }

      & .react-datepicker__day-name {
        font-size: 16px;
        font-weight: 500;
        line-height: 1.67;
        letter-spacing: -0.3px;
      }

      & .react-datepicker__day {
        font-size: 16px;
        line-height: 1.67;
        letter-spacing: -0.3px;
      }

      & .react-datepicker__day--selected,
      .react-datepicker__day--keyboard-selected {
        border-radius: 50% !important;
        background-color: #ced8d5 !important;
        font-color: black;
      }

      & .react-datepicker__month-container {
        font-size: 28px;
      }

      & .react-datepicker__day--keyboard-selected,
      .react-datepicker__month-text--keyboard-selected,
      .react-datepicker__quarter-text--keyboard-selected,
      .react-datepicker__year-text--keyboard-selected,
      .react-datepicker__day--selected {
        border-radius: 50%;
        background-color: #2c5ae9;
        color: black;
      }
    }
  }
`;
