import { Div } from "../global/globalStyle";
import { SelectOption, SelectWrapper } from "./detailStyle"
import ReserveSelect from "./ReserveSelect"

const RegisterReserve = () => {

    return (
        <Div width="100%">
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
        </Div>
    )
}

export default RegisterReserve;