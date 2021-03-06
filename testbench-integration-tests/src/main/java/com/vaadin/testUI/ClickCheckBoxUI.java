/*
 * Copyright 2000-2014 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.testUI;

import javax.servlet.annotation.WebServlet;

import com.vaadin.annotations.VaadinServletConfiguration;
import com.vaadin.server.VaadinRequest;
import com.vaadin.server.VaadinServlet;
import com.vaadin.testbench.elements.CheckBoxElement;
import com.vaadin.tests.AbstractTestUI;
import com.vaadin.ui.CheckBox;

/**
 * UI used to validate {@link CheckBoxElement#click()} works as expected.
 */
@SuppressWarnings("serial")
public class ClickCheckBoxUI extends AbstractTestUI {
    @WebServlet(value = { "/VAADIN/*", "/ClickCheckBoxUI/*" }, asyncSupported = true)
    @VaadinServletConfiguration(productionMode = false, ui = ClickCheckBoxUI.class)
    public static class Servlet extends VaadinServlet {
    }

    /*
     * (non-Javadoc)
     *
     * @see com.vaadin.tests.components.AbstractTestUI#setup(com.vaadin.server.
     * VaadinRequest)
     */
    @Override
    protected void setup(VaadinRequest request) {
        CheckBox checkBox = new CheckBox("Checkbox Caption");
        addComponent(checkBox);
    }

    /*
     * (non-Javadoc)
     *
     * @see com.vaadin.tests.components.AbstractTestUI#getTestDescription()
     */
    @Override
    protected String getTestDescription() {
        return "Ensure that CheckBoxElement.click() actually toggles checkmark";
    }

    /*
     * (non-Javadoc)
     *
     * @see com.vaadin.tests.components.AbstractTestUI#getTicketNumber()
     */
    @Override
    protected Integer getTicketNumber() {
        return 13763;
    }

}
