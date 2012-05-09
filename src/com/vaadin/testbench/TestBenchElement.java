package com.vaadin.testbench;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.internal.WrapsElement;

import com.vaadin.testbench.commands.CanWaitForVaadin;
import com.vaadin.testbench.commands.TestBenchCommandExecutor;
import com.vaadin.testbench.commands.TestBenchElementCommands;

public class TestBenchElement implements WrapsElement, WebElement,
        TestBenchElementCommands, CanWaitForVaadin {
    // private static final Logger LOGGER = Logger
    // .getLogger(TestBenchElement.class.getName());

    private WebElement actualElement;
    private final TestBenchCommandExecutor tbCommandExecutor;

    protected TestBenchElement(WebElement element,
            TestBenchCommandExecutor tbCommandExecutor) {
        actualElement = element;
        this.tbCommandExecutor = tbCommandExecutor;
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.openqa.selenium.internal.WrapsElement#getWrappedElement()
     */
    @Override
    public WebElement getWrappedElement() {
        return actualElement;
    }

    @Override
    public void waitForVaadin() {
        tbCommandExecutor.waitForVaadin();
    }

    @Override
    public void click() {
        actualElement.click();
    }

    @Override
    public void submit() {
        actualElement.click();
    }

    @Override
    public void sendKeys(CharSequence... keysToSend) {
        actualElement.sendKeys(keysToSend);
    }

    @Override
    public void clear() {
        actualElement.clear();
    }

    @Override
    public String getTagName() {
        return actualElement.getTagName();
    }

    @Override
    public String getAttribute(String name) {
        return actualElement.getAttribute(name);
    }

    @Override
    public boolean isSelected() {
        return actualElement.isSelected();
    }

    @Override
    public boolean isEnabled() {
        return actualElement.isEnabled();
    }

    @Override
    public String getText() {
        return actualElement.getText();
    }

    @Override
    public List<WebElement> findElements(By by) {
        List<WebElement> elements = actualElement.findElements(by);
        List<WebElement> tbElements = new ArrayList<WebElement>(elements.size());
        for (WebElement e : elements) {
            tbElements.add(TestBench.createElement(e, tbCommandExecutor));
        }
        return tbElements;
    }

    @Override
    public WebElement findElement(By by) {
        return TestBench.createElement(actualElement.findElement(by),
                tbCommandExecutor);
    }

    @Override
    public boolean isDisplayed() {
        return actualElement.isDisplayed();
    }

    @Override
    public Point getLocation() {
        return actualElement.getLocation();
    }

    @Override
    public Dimension getSize() {
        return actualElement.getSize();
    }

    @Override
    public String getCssValue(String propertyName) {
        return actualElement.getCssValue(propertyName);
    }

}