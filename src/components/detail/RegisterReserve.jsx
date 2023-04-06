import { Div } from "../global/globalStyle";
import { SelectOption, SelectWrapper } from "./detailStyle"
import ReserveSelect from "./ReserveSelect"

const RegisterReserve = (props) => {

    return (
        <Div width="100%">
          <SelectWrapper>
          {props?.reservationList.map((item)=>{
            return(<SelectOption>
              <ReserveSelect id = {item.id}/>
              {item.nickname}
              {item.startDate}
              {item.endDate}
            </SelectOption>)
            
          })}
          </SelectWrapper>
        </Div>
    )
}

export default RegisterReserve;