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
package com.vaadin.tests.testbenchapi;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.vaadin.testUI.TreeElementGetValue;
import com.vaadin.testbench.elements.TreeElement;

public class TreeElementGetValueIT extends MultiBrowserTest {
    @Before
    public void init() {
        openTestURL();
    }

    @Test
    public void testGetValue() {
        TreeElement tree = $(TreeElement.class).get(0);
        Assert.assertEquals(tree.getValue(),
                TreeElementGetValue.TEST_VALUE_LVL2);
    }
}
