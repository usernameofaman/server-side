import React, { useState } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

export const ExpandableFacets = ({
    title,
    selectedItems,
    children,
}) => {

    const [open, setOpen] = useState(false)

    const icon = open ? "-" : "+"

    return (
        <ExpansionPanel
            onChange={(_, expanded) => setOpen((expanded))}
        >
            <ExpansionPanelSummary
                expandIcon={<span>{icon}</span>}
                aria-label="Expand"
                aria-controls="additional-actions2-content"
                id="additional-actions2-header"
                className="category_sidebar__collapsebx"
            >
                <div>
                    <h6 className="facet-heading">{title}</h6>
                    <span className="selected_item_list">{selectedItems}</span>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className="textSecondary emw-facet-filter-chip-children">
                    {children}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default ExpandableFacets
