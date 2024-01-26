import Styled from "styled-components";

const GlobalUtilityStyle = Styled.div`
  .table-head-none {
    table {
      thead {
        display: none;
      }
    }
  }

  .table-head-rounded {
    table {
      thead {
        > tr {
          &:first-child {
            th {
              &:first-child {
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
              }
              &:last-child {
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
              }
            }
          }
        }
      }
    }
  }
  .table-th-border-none {
    thead {
      tr {
        th {
          border: none;
        }
      }
    }
  }
  .table-th-shape-none {
    thead {
      th {
        &:before {
          display: none;
        }
      }
    }
  }
  .table-tr-px-30 {
    table {
      tr {
        th,
        td {
          &:first-child {
            padding-left: 30px !important;
          }
          &:last-child {
            padding-right: 30px !important;
          }
        }
      }
    }
  }
  .table-border-b-none{
    tbody{
      tr{
        &:last-child{
          td{
            border-bottom: none;
          }
        }
      }
    }
  }
  .table-td-border-none {
    tbody {
      tr {
        td {
          border: none;
        }
      }
    }
  }
  .table-last-td-text-right {
    table {
       tbody {
      tr {
        td {
          &:last-child {
            text-align: right;
          div{
            float:right;
            padding-right: 20px
          }
            
          }
        }
      }
    }
    }
   
  }
  .table-selection-col-pl-25 {
    table {
      tr {
        .ant-table-selection-column {
          padding-left: 25px;
        }
      }
    }
  }
  .table-tr-selected-background-transparent {
    tbody {
      tr.ant-table-row-selected {
        td {
          background: transparent;
        }
      }
    }
  }
  .table-tr-hover-shadow {
    tbody {
      tr {
        &:hover {
          box-shadow: 0px 10px 15px rgba(116,116,116,0.08);
        }
      }
    }
  }
`;

export { GlobalUtilityStyle };
