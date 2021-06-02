import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import SeleniumServiceTests from './selenium-tests';

_chai.should();

@suite
class GetBEMBlockNameServiceUnitTests extends SeleniumServiceTests {
    public static async before() {
        await this.openPage('tests/html/bemnodes.getBEMBlockName.html');
    }

    @test async 'test getBEMBlockName() returns correct block name'() {
        const result = await GetBEMBlockNameServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-1').getBEMBlockName()"
        );
        _chai.assert(result === 'block', 'getBEMBlockName should return "block"');
    }

    @test async 'test getBEMBlockName() returns false if no block name could be found'() {
        const result = await GetBEMBlockNameServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-2').parentElement.getBEMBlockName()"
        );
        _chai.assert(result === null, 'getBEMBlockName should return null');
    }

    @test async 'test getBEMBlockName() returns correct block name when a needle is defined'() {
        const result = await GetBEMBlockNameServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-1').getBEMBlockName('block')"
        );
        _chai.assert(result === 'block', 'getBEMBlockName should return "block"');
    }

    @test async 'test getBEMBlockName() returns undefined if block name in needle could be found'() {
        const result = await GetBEMBlockNameServiceUnitTests.driver.executeScript(
            "return typeof document.querySelector('.test-1').getBEMBlockName('another-block')"
        );

        _chai.assert(
            result === 'undefined',
            'getBEMBlockName should return undefined if the block needle is not found'
        );
    }
}

@suite
class getBEMElementNameServiceUnitTests extends SeleniumServiceTests {
    public static async before() {
        await this.openPage('tests/html/bemnodes.getBEMElementName.html');
    }

    @test async 'test getBEMElementName() returns correct element'() {
        const result = await getBEMElementNameServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-1').getBEMElementName()"
        );
        _chai.assert(result === 'element', 'getBEMElementName should return "element"');
    }

    @test async 'test getBEMElementName() returns false if no element name could be found'() {
        const result = await getBEMElementNameServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-2').parentElement.getBEMElementName()"
        );
        _chai.assert(result === null, 'getBEMElementName should return null');
    }

    @test async 'test getBEMElementName() returns correct element name when a block name needle is defined'() {
        const result = await getBEMElementNameServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-3').getBEMElementName('block-2')"
        );
        _chai.assert(result === 'some-element', 'getBEMBlockName should return "some-element"');
    }

    @test
    async 'test getBEMElementName() returns null if no element name with block name in needle could be found'() {
        const result = await getBEMElementNameServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-3').getBEMElementName('non-existing-block')"
        );

        _chai.assert(result === null, 'getBEMElementName should return null if the block needle is not found');
    }
}

@suite
class getBEMModifiersServiceUnitTests extends SeleniumServiceTests {
    public static async before() {
        await this.openPage('tests/html/bemnodes.getBEMModifiers.html');
    }

    @test
    async 'test getBEMModifiers() returns modifiers of elements of the automatically detected block'() {
        const result = (await getBEMModifiersServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-1').getBEMModifiers()"
        )) as string[];

        _chai.assert(result.indexOf('modifier') !== -1, 'getBEMModifiers should return a modifier "modifier"');
        _chai.assert(result.indexOf('modifier2') !== -1, 'getBEMModifiers should return a modifier "modifier2"');
        _chai.assert(result.indexOf('modifier3') !== -1, 'getBEMModifiers should return a modifier "modifier3"');
    }

    @test
    async 'test getBEMModifiers() returns modifiers of a bare block of the automatically detected block'() {
        const result = (await getBEMModifiersServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-2').getBEMModifiers()"
        )) as string[];

        _chai.assert(result.indexOf('modifier10') !== -1, 'getBEMModifiers should return a modifier "modifier10"');
        _chai.assert(result.indexOf('modifier11') !== -1, 'getBEMModifiers should return a modifier "modifier11"');
    }

    @test
    async 'test getBEMModifiers() returns only the modifiers of elements of the automatically detected block'() {
        const result = (await getBEMModifiersServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-3').getBEMModifiers()"
        )) as string[];

        _chai.assert(result.indexOf('modifier') !== -1, 'getBEMModifiers should return a modifier "modifier"');
        _chai.assert(result.indexOf('modifier2') !== -1, 'getBEMModifiers should return a modifier "modifier2"');
        _chai.assert(result.indexOf('modifier3') === -1, 'getBEMModifiers should NOT return a modifier "modifier3"');
    }

    @test
    async 'test getBEMModifiers() returns empty array if elements of the automatically detected block do not have modifiers, but another does'() {
        const result = (await getBEMModifiersServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-4').getBEMModifiers()"
        )) as string[];

        _chai.assert(result.length === 0, 'getBEMModifiers() should return empty array if an element has no modifiers');
    }

    @test
    async 'test getBEMModifiers() returns modifiers of elements of the specified block'() {
        const result = (await getBEMModifiersServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-5').getBEMModifiers('block')"
        )) as string[];

        _chai.assert(result.indexOf('modifier') !== -1, 'getBEMModifiers should return a modifier "modifier"');
        _chai.assert(result.indexOf('modifier2') !== -1, 'getBEMModifiers should return a modifier "modifier2"');
        _chai.assert(result.indexOf('modifier3') !== -1, 'getBEMModifiers should return a modifier "modifier3"');
    }

    @test
    async 'test getBEMModifiers() returns modifiers of a bare block of the specified block'() {
        const result = (await getBEMModifiersServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-6').getBEMModifiers('block')"
        )) as string[];

        _chai.assert(result.indexOf('modifier2') !== -1, 'getBEMModifiers should return a modifier "modifier2"');
        _chai.assert(result.indexOf('modifier4') !== -1, 'getBEMModifiers should return a modifier "modifier4"');
    }

    @test
    async 'test getBEMModifiers() returns only the modifiers of elements of the specified block'() {
        const result = (await getBEMModifiersServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-7').getBEMModifiers('block')"
        )) as string[];

        _chai.assert(result.indexOf('modifier') !== -1, 'getBEMModifiers should return a modifier "modifier"');
        _chai.assert(result.indexOf('modifier2') === -1, 'getBEMModifiers should NOT return a modifier "modifier2"');
        _chai.assert(result.indexOf('modifier3') !== -1, 'getBEMModifiers should return a modifier "modifier3"');
    }

    @test
    async 'test getBEMModifiers() returns empty array if elements of the specified block do not have modifiers, but another does'() {
        const result = (await getBEMModifiersServiceUnitTests.driver.executeScript(
            "return document.querySelector('.test-8').getBEMModifiers('block')"
        )) as string[];

        _chai.assert(result.length === 0, 'getBEMModifiers() should return empty array if an element has no modifiers');
    }
}

@suite
class addBEMModifiersServiceUnitTests extends SeleniumServiceTests {
    public static async before() {
        await this.openPage('tests/html/bemnodes.addBEMModifier.html');
    }

    @test
    async 'test addBEMModifier() adds modifier to auto detected element'() {
        const result = (await addBEMModifiersServiceUnitTests.driver.executeScript(
            `const element = document.querySelector('.test-1');
            element.addBEMModifier('test1-modifier');
            return element.getBEMModifiers()`
        )) as string[];

        _chai.assert(result.indexOf('test1-modifier') !== -1, 'addBEMModifiers should add a modifier "test1-modifier"');
    }

    @test
    async 'test addBEMModifier() adds modifier to auto detected bare block'() {
        const result = (await addBEMModifiersServiceUnitTests.driver.executeScript(
            `const element = document.querySelector('.test-2');
            element.addBEMModifier('test2-modifier');
            return element.getBEMModifiers()`
        )) as string[];

        _chai.assert(result.indexOf('test2-modifier') !== -1, 'addBEMModifiers should add a modifier "test2-modifier"');
    }

    @test
    async 'test addBEMModifier() adds modifier to element of specified block'() {
        const result = (await addBEMModifiersServiceUnitTests.driver.executeScript(
            `const element = document.querySelector('.test-3');
            element.addBEMModifier('test3-modifier', 'block');
            return element.getBEMModifiers('block')`
        )) as string[];

        _chai.assert(result.indexOf('test3-modifier') !== -1, 'addBEMModifiers should add a modifier "test3-modifier"');
    }

    @test
    async 'test addBEMModifier() adds modifier ot specified bare block'() {
        const result = (await addBEMModifiersServiceUnitTests.driver.executeScript(
            `const element = document.querySelector('.test-4');
            element.addBEMModifier('test4-modifier', 'bare-block');
            return element.getBEMModifiers('bare-block')`
        )) as string[];

        _chai.assert(result.indexOf('test4-modifier') !== -1, 'addBEMModifiers should add a modifier "test4-modifier"');
    }
}

@suite
class removeBEMModifierServiceUnitTests extends SeleniumServiceTests {
    public static async before() {
        await this.openPage('tests/html/bemnodes.removeBEMModifier.html');
    }

    @test
    async 'test removeBEMModifier() removes modifier from auto detected element'() {
        const startModifiers = (await removeBEMModifierServiceUnitTests.driver.executeScript(
            `return document.querySelector('.test-1').getBEMModifiers();`
        )) as string[];

        const endModifiers = (await removeBEMModifierServiceUnitTests.driver.executeScript(
            `document.querySelector('.test-1').removeBEMModifier('modifier2');
            return document.querySelector('.test-1').getBEMModifiers();`
        )) as string[];

        _chai.assert(startModifiers.length - endModifiers.length === 1, 'removeBEMModifier should remove one modifier');
        _chai.assert(
            endModifiers.indexOf('modifier2') === -1,
            'removeBEMModifier should have removed modifier "modifier2"'
        );
    }

    @test
    async 'test removeBEMModifier() removes modifier from element of specified block'() {
        const startModifiers = (await removeBEMModifierServiceUnitTests.driver.executeScript(
            `return document.querySelector('.test-2').getBEMModifiers('block');`
        )) as string[];

        const endModifiers = (await removeBEMModifierServiceUnitTests.driver.executeScript(
            `document.querySelector('.test-2').removeBEMModifier('modifier3', 'block');
            return document.querySelector('.test-2').getBEMModifiers('block');`
        )) as string[];

        _chai.assert(startModifiers.length - endModifiers.length === 1, 'removeBEMModifier should remove one modifier');
        _chai.assert(
            endModifiers.indexOf('modifier3') === -1,
            'removeBEMModifier should have removed modifier "modifier3"'
        );
    }
}

@suite
class hasBEMModifierServiceUnitTests extends SeleniumServiceTests {
    public static async before() {
        // await this.openPage('tests/html/bemnodes.hasBEMModifier.html');
    }
}

@suite
class toggleBEMModifierServiceUnitTests extends SeleniumServiceTests {
    public static async before() {
        // await this.openPage('tests/html/bemnodes.toggleBEMModifier.html');
    }
}

@suite
class getBEMBlockRootServiceUnitTests extends SeleniumServiceTests {
    public static async before() {
        // await this.openPage('tests/html/bemnodes.getBEMBlockRoot.html');
    }
}

@suite
class getNodesServiceUnitTests extends SeleniumServiceTests {
    public static async before() {
        // await this.openPage('tests/html/bemnodes.getNodes.html');
    }
}

@suite
class findBEMServiceUnitTests extends SeleniumServiceTests {
    public static async before() {
        // await this.openPage('tests/html/bemnodes.findBEM.html');
    }
}
