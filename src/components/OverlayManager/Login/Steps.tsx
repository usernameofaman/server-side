import React, { useCallback } from 'react';

export interface Step {
    label: string,
    value: string,
    activeLabel: string,
}

interface StepsProps {
    currentStep: Step,
    steps: Step[]
}

const Steps: React.FC<StepsProps> = ({
    currentStep,
    steps,
}: StepsProps) => {

    return ( 
        <div className="steps">
            {
                steps.map(
                    (step: Step, index: number) => {
                        return (
                            <>
                                <div>
                                    <div className={`step ${currentStep.value === step.value ? "active" : ""}`}>
                                        {step.label}
                                    </div>
                                    <span className="active-label">
                                        {currentStep.value === step.value ? step.activeLabel : ""}
                                    </span>
                                </div>
                                {
                                    index !== steps.length - 1 ? <span className="divider"></span> : null
                                }
                            </>
                        )
                    }
                )
            }
        </div> 
    )
}

export default Steps
