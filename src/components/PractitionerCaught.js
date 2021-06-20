import React from "react";
import Practitioner from "./Practitioner";
import ErrorBoundary from "./ErrorBoundary";

function PractitionerCaught(){
return(
    <ErrorBoundary>
        <Practitioner />
    </ErrorBoundary>
    )
}
export default PractitionerCaught