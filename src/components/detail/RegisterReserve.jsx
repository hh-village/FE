import { SelectOption, SelectWrapper } from "./detailStyle"
import ReserveSelect from "./ReserveSelect"

const RegisterReserve = () => {

    return (
        <div style={{padding:'7rem 0 0 0'}}>
          <SelectWrapper>
            <SelectOption>
              <ReserveSelect/>
            </SelectOption>
            <SelectOption>
              <ReserveSelect/>
            </SelectOption>
            <SelectOption>
              <ReserveSelect/>
            </SelectOption>
          </SelectWrapper>
        </div>
    )
}