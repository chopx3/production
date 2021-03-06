/**
 * This class is generated by jOOQ
 */
package ru.avito.jooqdbmodel.tables.records;


import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record2;
import org.jooq.Row2;
import org.jooq.impl.UpdatableRecordImpl;
import ru.avito.jooqdbmodel.tables.Question;

import javax.annotation.Generated;


/**
 * This class is generated by jOOQ.
 */
@Generated(
        value = {
                "http://www.jooq.org",
                "jOOQ version:3.8.0"
        },
        comments = "This class is generated by jOOQ"
)
@SuppressWarnings({"all", "unchecked", "rawtypes"})
public class QuestionRecord extends UpdatableRecordImpl<QuestionRecord> implements Record2<Integer, String> {

    private static final long serialVersionUID = 1910914611;

    /**
     * Setter for <code>avito.question.id</code>.
     */
    public void setId(Integer value) {
        set(0, value);
    }

    /**
     * Getter for <code>avito.question.id</code>.
     */
    public Integer getId() {
        return (Integer) get(0);
    }

    /**
     * Setter for <code>avito.question.description</code>.
     */
    public void setDescription(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>avito.question.description</code>.
     */
    public String getDescription() {
        return (String) get(1);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record1<Integer> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record2 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row2<Integer, String> fieldsRow() {
        return (Row2) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row2<Integer, String> valuesRow() {
        return (Row2) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field1() {
        return Question.QUESTION.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return Question.QUESTION.DESCRIPTION;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value2() {
        return getDescription();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuestionRecord value1(Integer value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuestionRecord value2(String value) {
        setDescription(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuestionRecord values(Integer value1, String value2) {
        value1(value1);
        value2(value2);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached QuestionRecord
     */
    public QuestionRecord() {
        super(Question.QUESTION);
    }

    /**
     * Create a detached, initialised QuestionRecord
     */
    public QuestionRecord(Integer id, String description) {
        super(Question.QUESTION);

        set(0, id);
        set(1, description);
    }
}
