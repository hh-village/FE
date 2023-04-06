import { SelectOption, SelectWrapper } from "./detailStyle"
import ReserveSelect from "./ReserveSelect"

const RegisterReserve = (props) => {

    return (
        <div style={{padding:'7rem 0 0 0'}}>
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
        </div>
    )
}

export default RegisterReserve;